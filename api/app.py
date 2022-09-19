import re
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)


#conexion
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://giseth:giseth@localhost/proyectoweb'
#exitar errores
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
CORS(app, supports_credentials=True)
#configuracion
db= SQLAlchemy(app)
#esquema
mar= Marshmallow(app)

#creando en la base de datos

#tabla cliente(usuarios)
class clientes(db.Model):
    id = db.Column(db.Integer,primary_key=True,unique=True,autoincrement=True)
    nombre = db.Column(db.String(50))
    apellido = db.Column(db.String(50))
    tipo_documento= db.Column(db.ForeignKey('tipo_documento.id'))
    documento= db.Column(db.String(50))
    lugar_na= db.Column(db.String(50))
    fecha_na= db.Column(db.String(50))
    email= db.Column(db.String(50))
    telefono= db.Column(db.BigInteger)
    lu_residencia= db.Column(db.ForeignKey('lu_residencia.id'))
    sexo = db.Column(db.ForeignKey('sexo.id'))

#contrutor
    def __init__(self,nombre,apellido,tipo_documento,documento,lugar_na,fecha_na,email,telefono,lu_residencia,sexo):
        self.nombre = nombre
        self.apellido = apellido
        self.tipo_documento= tipo_documento
        self.documento=documento
        self.lugar_na=lugar_na
        self.fecha_na=fecha_na
        self.email=email
        self.telefono=telefono
        self.lu_residencia=lu_residencia
        self.sexo=sexo 

#tabla de sexo
class sexo(db.Model):
    id = db.Column(db.Integer,primary_key=True,unique=True,autoincrement=True)
    sexo = db.Column(db.String(10))

#contrutor sexo
    def __init__(self,sexo):
        self.sexo=sexo

#tabla de tipo de documento
class tipo_documento(db.Model):
    id = db.Column(db.Integer,primary_key=True,unique=True,autoincrement=True)
    tipos = db.Column(db.String(10))

#contrutor tipo de documento
    def __init__(self,tipos):
        self.tipos=tipos 

#tabla de ciudades
class lu_residencia(db.Model):
    id = db.Column(db.Integer,primary_key=True,unique=True,autoincrement=True)
    ciudad = db.Column(db.String(500))

#contrutor tipo de documento
    def __init__(self,ciudad):
        self.ciudad=ciudad 

#crear en mysql
db.create_all()
 
 #crear esquema
class Xdchema(mar.Schema):
    class Meta:
        fields=('id', 'nombre','apellido','tipo_documento','documento','lugar_na','fecha_na','email','telefono','lu_residencia','sexo')

#instanciar
instancia = Xdchema()
#obtener muchos datos
datos= Xdchema(many=True)


#crear un usuario
@app.route('/usuario', methods=['POST'])

def addUsuaio():

    nombre = request.json['nombre']

    apellido = request.json['apellido']

    tipo_documento= request.json['tipo_documento']

    documento= request.json['documento']

    lugar_na= request.json['lugar_na']

    fecha_na= request.json['fecha_na']

    email= request.json['email']

    telefono= request.json['telefono']

    lu_residencia= request.json['lu_residencia']

    sexo = request.json['sexo']

    variable=clientes(nombre,apellido,tipo_documento,documento,lugar_na,fecha_na,email,telefono,lu_residencia,sexo)

    db.session.add(variable)

    print(variable)

    db.session.commit()

    return instancia.jsonify(variable)

# get usuarios
@app.route('/usuario', methods=['GET'])
def get_usuario():
    usuarios=clientes.query.all()
    user= datos.dump(usuarios)
    return jsonify(user)

#get usuario por id
@app.route('/usuario/<id>', methods=['GET'])
def get_userbyId(id):
    user_exp = clientes.query.get(id)
    return instancia.jsonify(user_exp)

#put usuario
@app.route('/usuario/<id>', methods=['PUT'])
def actualizarusuario(id):
    actualizar=clientes.query.get(id)
    
    nombre = request.json['nombre']

    apellido = request.json['apellido']

    tipo_documento = request.json['tipo_documento']

    documento = request.json['documento']

    lugar_na = request.json['lugar_na']

    fecha_na = request.json['fecha_na']

    email = request.json['email']

    telefono = request.json['telefono']

    lu_residencia= request.json['lu_residencia']

    sexo = request.json['sexo']

    actualizar.nombre = nombre

    actualizar.apellido=apellido

    actualizar.tipo_documento=tipo_documento

    actualizar.documento=documento

    actualizar.lu_residencia=lu_residencia

    actualizar.lugar_na=lugar_na

    actualizar.fecha_na=fecha_na

    actualizar.email=email

    actualizar.telefono=telefono

    actualizar.sexo = sexo

    db.session.commit()

    return instancia.jsonify(actualizar)


#eliminar
@app.route('/usuario/<id>', methods=['DELETE'])
def borrar(id): 
    delcliente=clientes.query.get(id)

    db.session.delete(delcliente)

    db.session.commit()

    return instancia.jsonify(delcliente)

if __name__=='__main__':
    app.run(debug=True)

#####datos insertados manualmente en mysql
"""
insert into tipo_documento values(NULL, "CC");
insert into tipo_documento values(NULL, "TI");
insert into tipo_documento values(NULL, "TP");
insert into tipo_documento values(NULL, "RC");
insert into tipo_documento values(NULL, "CE");
insert into tipo_documento values(NULL, "DNI");

insert into sexo values(NULL, "M");
insert into sexo values(NULL, "F");
insert into sexo values(NULL, "Otros");

insert into lu_residencia values(NULL,"Bucaramanga");
insert into lu_residencia values(NULL,"Bogota");
insert into lu_residencia values(NULL,"Medellin");
insert into lu_residencia values(NULL,"Cali");
insert into lu_residencia values(NULL,"Popayan");
insert into lu_residencia values(NULL,"Pasto");
insert into lu_residencia values(NULL,"Manizales");
insert into lu_residencia values(NULL,"Pereira");
insert into lu_residencia values(NULL,"Armenia");
insert into lu_residencia values(NULL,"Valledupar");
insert into lu_residencia values(NULL,"Yopal");
insert into lu_residencia values(NULL,"Cartagena");
insert into lu_residencia values(NULL,"Barranquilla");
insert into lu_residencia values(NULL,"Santa Marta");
insert into lu_residencia values(NULL,"Rioacha");
insert into lu_residencia values(NULL,"San Andres");
insert into lu_residencia values(NULL,"Cucuta");
insert into lu_residencia values(NULL,"Ibague");
insert into lu_residencia values(NULL,"Villavicencio");
insert into lu_residencia values(NULL,"Floridablanca");

"""
