# Import.
from pydantic import BaseModel

# Vamos criar uma classe apenas para validar o input possui o data type necessário.
# O FastAPI utiliza o pydantic, o mesmo nao verifica cada feature individualmente, ele
# instancia tudo em um unico objeto chamado data.

# NOTE: Quando alguém envia um objeto JSON para o servidor criado via FastAPI, 
# o FastAPI faz dado_enviado = ModelInput(age=29, sex=1, ...), AI O JSON MORRE 
# E VIRA UM OBJETO VIVO DENTRO DO PYTHON.

# NOTE: Ao criamos a classe, colocamos BaseModel dentro dos parenteses, fazendo com que 
# a classe ModelInput HERDE (herança) todos os atributos e métodos do BaseModel, que é 
# uma classe do Pydantic.

class ModelInput(BaseModel):
    age: int
    sex: int
    education: int
    has_children: int
    has_property: int
    has_car: int
    ever_loan: int
    loan_paid: int
    annual_salary: int
    invested_amount: int
