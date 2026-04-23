from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import psycopg2.errors
import bcrypt

app = Flask(__name__)
CORS(app, origins="*")

DB_CONFIG = {
    'host':     'localhost',
    'database': 'styleme_db',
    'user':     'postgres',
    'password': '2110',
    'options':  '-c search_path=public'  
}

def get_db():
    return psycopg2.connect(**DB_CONFIG)

@app.route('/api/cadastro', methods=['POST'])
def cadastro():
    dados = request.get_json(force=True)
    print("DADOS RECEBIDOS:", dados)

    nome  = dados.get('nome', '').strip()
    email = dados.get('email', '').strip()
    senha = dados.get('senha', '').strip()

    if not nome or not email or not senha:
        return jsonify({'erro': 'Preencha todos os campos.'}), 400

    senha_hash = bcrypt.hashpw(senha.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    conn = None
    try:
        conn = get_db()
        cur  = conn.cursor()
        cur.execute(
            "INSERT INTO usuarios (nome, email, senha_hash) VALUES (%s, %s, %s)",
            (nome, email, senha_hash)
        )
        conn.commit()
        cur.close()
        return jsonify({'mensagem': 'Cadastro realizado com sucesso!'}), 201

    except psycopg2.errors.UniqueViolation:
        if conn:
            conn.rollback()
        return jsonify({'erro': 'Este e-mail já está cadastrado.'}), 409

    except Exception as e:
        print("ERRO DETALHADO:", e)
        if conn:
            conn.rollback()
        return jsonify({'erro': str(e)}), 500

    finally:
        if conn:
            conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    dados = request.get_json(force=True)
    email = dados.get('email', '').strip()
    senha = dados.get('senha', '').strip()

    if not email or not senha:
        return jsonify({'erro': 'Preencha todos os campos.'}), 400

    conn = None
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute("SELECT senha_hash FROM usuarios WHERE email = %s", (email,))
        resultado = cur.fetchone()
        cur.close()

        if resultado is None:
            return jsonify({'erro': 'Usuário não encontrado.'}), 404

        senha_hash = resultado[0]

        if bcrypt.checkpw(senha.encode('utf-8'), senha_hash.encode('utf-8')):
            return jsonify({'mensagem': 'Login efetuado com sucesso!'}), 200
        else:
            return jsonify({'erro': 'Senha incorreta.'}), 401

    except Exception as e:
        print("Erro no login:", e)
        return jsonify({'erro': 'Erro interno no servidor.'}), 500

    finally:
        if conn:
            conn.close()

if __name__ == '__main__':
    app.run(debug=True, port=5000)