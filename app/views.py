"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

import os
from app import app, db
from flask import render_template, request, redirect, jsonify
from .forms import NewUser, NewCar
from werkzeug.utils import secure_filename
from .models import *
import uuid
# from werkzeug.security import check_password_hash 

###
# Routing for your application.
###

@app.route('/api/register', methods=['POST'])
def register():
    user = NewUser()
    message = [{"errors": "critical error"}]
    if request.method == 'POST':
        user.username.data = request.form['username']
        user.password.data = request.form['password']
        user.name.data = request.form['name']
        user.email.data = request.form['email']
        user.location.data = request.form['location']
        user.biography.data = request.form['bio']
        user.photo.data = request.files['photo']
        message = [{"errors": form_errors(user)}]

        if user.validate_on_submit():
            username = user.username.data
            password = user.password.data
            name = user.name.data
            email = user.email.data
            location = user.location.data
            biography = user.biography.data
            profile_photo = user.photo.data

            filename = genUniqueFileName(profile_photo.filename)
            userDB = Users(username, password, name, email, location, biography, filename)
            db.session.add(userDB)
            db.session.commit()
            profile_photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            message = [{"message": "Successful Registered!"}]

    message = jsonify(message=message)
    return message

@app.route('/api/users/<user_id>', methods=['GET'])
def userProfile(user_id):
    if request.method == 'GET':
        # user = Users.query.filter_by(id=user_id).first()
        # username = user.username
        # name = user.name
        # email = user.email
        # location = user.location
        # biography = user.biography
        # photo = user.photo
        # day = user.date_joined.day
        # month = user.date_joined.strftime("%B")
        # year = user.date_joined.year
        # date_joined = str(month) + " " + str(day) + ", " + str(year)
        # return jsonify(username=username, name=name, email=email, location=location, biography=biography, photo=photo, date_joined=date_joined)

        user = Users.query.get(int(user_id))
        username = Users.query.get(username)
        name = Users.query.get(name)
        email = Users.query.get(email)
        location = Users.query.get(location)
        biography = Users.query.get(biography)
        photo = Users.query.get(photo)
        date_joined = Users.query.get(date_joined)
        day = date_joined.day
        month = date_joined.strftime("%B")
        year = date_joined.year
        date_joined = str(month) + " " + str(day) + ", " + str(year)
        return jsonify(username=username, name=name, email=email, location=location, biography=biography, photo=photo, date_joined=date_joined)


@app.route('/api/cars', methods=['POST', 'GET'])
def addCar():
    car = NewCar()
    message = [{"errors": "critical error"}]

    if request.method == 'POST':
        car.make.data = request.form['make']
        car.model.data = request.form['model']
        car.colour.data = request.form['colour']
        car.year.data = request.form['year']
        car.price.data = request.form['price']
        car.type.data = request.form['type']
        car.transmission.data = request.form['transmission']
        car.description.data = request.form['desc']
        car.photo.data = request.files['photo']
        message = [{"errors": form_errors(car)}]

        if user.validate_on_submit():
            make = car.make.data 
            model = car.model.data 
            colour = car.colour.data 
            year = car.year.data 
            price = car.price.data 
            car_type = car.type.data 
            transmission = car.transmission.data
            description = car.description.data 
            car_photo = car.photo.data 

            filename = genUniqueFileName(car_photo.filename)
            carDB = Cars()
            db.session.add(carDB)
            db.session.commit()
            profile_photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            message = [{"message": "Your car has been successfully added."}]

    message = jsonify(message=message)
    return message

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    """
    Because we use HTML5 history mode in vue-router we need to configure our
    web server to redirect all routes to index.html. Hence the additional route
    "/<path:path".

    Also we will render the initial webpage and then let VueJS take control.
    """
    return render_template('index.html')


###
# The functions below should be applicable to all Flask apps.
###

# Display Flask WTF errors as Flash messages
def flash_errors(form):
    for field, errors in form.errors.items():
        for error in errors:
            flash(u"Error in the %s field - %s" % (
                getattr(form, field).label.text,
                error
            ), 'danger')

@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                    getattr(form, field).label.text,
                    error
                )
            error_messages.append(message)

    return error_messages


def genUniqueFileName(old_filename):
    filename = str(uuid.uuid4())
    ext = old_filename.split(".")
    ext = ext[1]
    new_filename = filename + "." + ext
    new_filename = new_filename.replace('-', '_')
    return new_filename


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404
