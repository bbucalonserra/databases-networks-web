# Imports de bibilitecas.
import pickle
import pandas as pd
from fastapi import FastAPI
from server.models import ModelInput

# Abrindo o arquivo PKL contendo o modelo.
with open(r"./models/trained_model-0.1.0.pkl", "rb") as f:
    model = pickle.load(f)

# Instanciamos a aplicação, gerando um objeto chamado app para utilizar o FastAPI.
app = FastAPI()

# Aqui, criamos o endpoint da FastAPI, instanciado em app, método POST HTTP.
@app.post("/predict")

# Escolhemos o parâmetro "data" para armazenar o que é enviado pelo user.
# Logo, ao fazer data: ModelInput, estamos dizendo que o que for enviado pelo usuário precisa
# ter o molde de ModelInput. Ele vai no lugar de um tipo de dado. 
# Da mesma forma que fazemos name:str, estamos dizendo que o name tem um molde do tipo inteiro.,
# fazemos um molde porém utilizando uma classe.
def predict(data: ModelInput):

    # Criamos um dataframe, criando com base no que o usuário envia.
    # O model_dump é um método do BaseModel. Ele colea o objeto (da classe) e transforma em
    # um dicionário comum de python.
    input_df = pd.DataFrame([data.model_dump()])

    # Calculamos as probabilidades.
    proba_list = model.predict_proba(input_df)

    # O predict proba multi target me da n arrays, uma por target.
    # Cada array possui a proba da classe negativa depois da positiva.
    # Logo, y_proba[0] me da as probas do primeiro target
    # y_proba[0][0] me da a proba 0 e 1 do primeiro target pra primeira observação.
    # y_proba[0][0][1] me da a proba de obter 1 (primeiro classe negativa depois positiva).

    list_target =["personal_loan", 
                "mortgage",
                "auto_loan",
                "credit_card",
                "overdraft", 
                "payroll_loan",
                "student_loan",
                "working_capital_loan"]

    # Cria um dicionário fazio.
    dict_probas = dict()

    # Para cada targer e probabilidade entre os pares de target + probabilidade,
    # adiciona no dicionario o nome do target como key e a probabilidade como value.
    for target, proba in zip(list_target, proba_list):
        dict_probas[target] = float(proba[0][1])

    # Retorna o dicionário.
    return (dict_probas)