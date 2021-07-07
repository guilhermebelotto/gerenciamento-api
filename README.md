
# gerenciamento-api

O dados são armazenados na plataforma MongoDB Atlas e o deploy feito no Heroku, o frontend não foi implementado.

Será necessário utilizar uma ferramenta como POSTMAN para interagir com a api.

1 - É necessário enviar uma requisição POST para: 
https://salty-woodland-74776.herokuapp.com/user/login
a fim de gerar um token de autenticação de usuário, corpo da requisição:
```json
{
    "name": "avaliador",
    "password": "benice"
}
```
O token é devolvido na resposta da requisição.

2 - Em posse do token, basta inserí-lo na ferramenta POSTMAN na aba HEADERS, com valores para KEY = auth-token
e VALUE = token; 

para o usuário sugerido o token resultante é: 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGU0ZTlkNGUyOThkYzBkMDA5YTE0MmEiLCJpYXQiOjE2MjU2MjA4NDl9.eub3xD-xj-kvL79-JL_F5W4BfC_LhK7hS2q_eJbhV2c

3 - A possíveis requisições são:
GET https://salty-woodland-74776.herokuapp.com/employees

GET https://salty-woodland-74776.herokuapp.com/employees/(id do usuário)

POST https://salty-woodland-74776.herokuapp.com/employees , com a seguinte estrutura no body:

  ex: 
  ```json
  {
    "employeeName": "Teste",
    "employeeEmail": "teste@email",
    "employeeDepartment": "teste",
    "employeeSalary": 2000,
    "employeeBirth_date": "2010-02-15"
  }
  ```
PUT https://salty-woodland-74776.herokuapp.com/employees/(id do usuário), com a seguinte estrutura no body:

  ex:
  ```json
  {
    "employeeName": "TesteDiferente",
    "employeeEmail": "teste@email",
    "employeeDepartment": "teste",
    "employeeSalary": 2000,
    "employeeBirth_date": "2010-02-15"
  }
  ```
  DELETE https://salty-woodland-74776.herokuapp.com/employees/(id do usuário)
  
  GET https://salty-woodland-74776.herokuapp.com/reports/employees/salary
  
  GET https://salty-woodland-74776.herokuapp.com/reports/employees/age
