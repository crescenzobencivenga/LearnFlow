# Per far partire un file flask,
#   1) immettersi nella shell
#   2) posizionarsi nella cartella ove situato il file con import FLASK
#   3) immettere il comando flask run -h 0.0.0.0 -p 5000
#       a) questo comando fa partire flask sulla porta 5000
#       b) ed accetta ogni connessione che parte sulla macchina
#   4) apparirà un link, cliccateci sopra, verrete redirezionati
#   5) CTRL+C per chiudere flask
import json
from json import dumps

import pymongo
from bson import json_util
from flask import Flask, jsonify, request,render_template
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
CORS(app)
app.debug=True

client = pymongo.MongoClient(
    "mongodb+srv://USER:PASSWORD@cluster.p0jl4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.get_database('LearnFlow_mongoDB')
login_collection = db['LF_login']
user_info = db['LF_user_info']


# base
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/login/', methods=['POST'])
def login():
    print("inizio inserimento...")
    login_user = login_collection.find_one({'mail': request.form['mail']})
    print("controllo user...")
    if login_user:
        # controllo coincidenza password (se c'è questo utente)
        print("user presente, convalida password...")
        if bcrypt.checkpw(
                request.form['password'].encode('utf-8'),
                login_user['password']
        ):
            print("password convalidata...")
            # SI RICAVA LISTA DEI VALORI TIPO [LVL][ARG][PNT] per poter settare la pagina propriamente
            uname = login_user['username']
            print("oggetto ottenuto: " + uname)
            item = user_info.find_one({'username': uname})
            item['_id'] = str(item['_id'])  # da ObjectId a string.
            return jsonify({'user_data': item})
    print("pasword non convalidata....")
    return "0"


@app.route('/registration', methods=['POST', 'GET'])
def register():
    print("controllo utente...")
    if request.method == 'POST':
        existing_user = login_collection.find_one({'username': request.form['username']})
        existing_mail = login_collection.find_one({'mail': request.form['mail']})
        print("utente:")
        # print(existing_user)
        # se l'utente già esiste -> ritorna null, altrimeni lo crea inserendo i campi
        if existing_user is None or existing_mail is None:
            # si crea un record nel campo identificazione
            print("creazione utente...")
            hashpass = bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt())
            login_collection.insert_one(
                {
                    'username': request.form['username'],
                    'mail': request.form['mail'],
                    'password': hashpass
                }
            )
            # si crea un record nel campo dati (di gioco)
            print("creazioni dati gioco...")
            user_info.insert_one(
                {
                    'username': request.form['username'],
                    'lvl': '0',
                    'arg': '0',
                    'pnt': '0'
                }
            )
            print("ritorno dati...")
            return "1"
    return "0"


# @app.route('/update_data', methods=['POST'])
# def update_data():
#     myquery = {'username': request.form['username']}
#     newvalues = {"$set":
#         {
#             "username": request.form['username'],
#             "lvl": request.form['lvl'],
#             "arg": request.form['arg'],
#             "pnt": request.form['pnt']
#         }
#     }
#     info = user_info.update_one(myquery, newvalues)
#     return jsonify({'user_data': info})

@app.route('/update_data/<username>/<lvl>/<arg>/<pnt>', methods=['POST'])
def update_data(username, lvl, arg, pnt):
    myquery = {'username': username}
    newvalues = {"$set":
        {
            "username": username,
            "lvl": lvl,
            "arg": arg,
            "pnt": pnt
        }
    }
    x = user_info.update_one(myquery, newvalues)
    item = user_info.find_one({'username': username})
    item['_id'] = str(item['_id'])  # da ObjectId a string.
    return jsonify({'user_data': item})


@app.route('/get_data', methods=['POST'])
def get_data_user():
    item = user_info.find_one({'username': request.form['username']})
    item['_id'] = str(item['_id'])  # da ObjectId a string.
    return jsonify({'user_data': item})


@app.route('/get_top', methods=['GET'])
def get_top():
    item = user_info.find().sort("pnt", -1).limit(15)
    i = 0
    x = {i: {'n_item': str(item.count())}}
    for doc in item:
        i = i + 1
        x[i] = {'username': doc['username'], 'pnt': doc['pnt']}
    return json.dumps(x)


if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(debug=True)
