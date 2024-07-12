#!/usr/bin/env python3

# Remote library imports
from flask import Flask, jsonify, request, redirect, url_for, flash, abort
from flask_restful import Resource
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_cors import CORS
from sqlalchemy.orm.exc import NoResultFound

# Local imports
from config import app, db, api
from models import Album, Member, Review

login_manager = LoginManager(app)
login_manager.login_view = 'login'

CORS(app)

@login_manager.user_loader
def load_user(user_id):
    return Member.query.get(int(user_id))

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    if not name or not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400
    
    existing_user = Member.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'Email already registered'}), 400

    user = Member(name=name, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'Registration successful! Please log in.'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    user = Member.query.filter_by(email=email).first()
    if user and user.check_password(password):
        login_user(user)
        return jsonify({'message': 'Login successful!', 'user': user.to_dict()}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401
    
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful!'}), 200

@app.route('/protected')
@login_required
def protected():
    return jsonify({'message': f'Logged in as: {current_user.name}'})

@app.route('/check_login')
def check_login():
    if current_user.is_authenticated:
        return jsonify({'logged_in': True, 'user': current_user.to_dict()})
    else:
        return jsonify({'logged_in': False})
    
@app.route('/')
def index():
    return jsonify({'message': 'Welcome to the API'})

@app.before_first_request
def create_tables():
    db.create_all()

@app.route('/profile', methods=['GET'])
@login_required
def profile():
    user_info = current_user.to_dict()
    user_info['reviews'] = [review.to_dict() for review in current_user.reviews]
    return jsonify(user_info)

@app.route('/albums', methods=['GET', 'POST'])
def handle_albums():
    if request.method == 'POST':
        data = request.json
        new_album = Album(**data)
        db.session.add(new_album)
        db.session.commit()
        return jsonify(new_album.to_dict()), 201

    albums = Album.query.all()
    return jsonify([album.to_dict() for album in albums]), 200

@app.route('/albums/<int:album_id>', methods=['GET'])
def get_album(album_id):
    album = Album.query.get(album_id)
    if not album:
        return jsonify({'error': 'Album not found'}), 404

    album_data = album.to_dict()
    album_data['reviews'] = [review.to_dict() for review in album.reviews]

    return jsonify(album_data)

@app.route('/members', methods=['GET', 'POST'])
def handle_members():
    if request.method == 'POST':
        data = request.json
        new_member = Member(**data)
        db.session.add(new_member)
        db.session.commit()
        return jsonify(new_member.to_dict()), 201

    members = Member.query.all()
    return jsonify([member.to_dict() for member in members]), 200

@app.route('/reviews', methods=['GET', 'POST'])
def handle_reviews():
    if request.method == 'POST':
        data = request.json
        new_review = Review(**data)
        try:
            db.session.add(new_review)
            db.session.commit()
            return jsonify(new_review.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            abort(400, str(e))

    elif request.method == 'GET':
        reviews = Review.query.all()
        return jsonify([review.to_dict() for review in reviews]), 200
    
@app.route('/reviews/<int:review_id>', methods=['GET', 'PATCH', 'DELETE'])
def handle_review(review_id):
    try:
        review = Review.query.filter_by(id=review_id).one()
    except NoResultFound:
        abort(404, f"Review with ID {review_id} not found")

    if request.method == 'GET':
        return jsonify(review.to_dict()), 200

    elif request.method == 'PATCH':
        data = request.json
        if 'rating' in data:
            new_rating = int(data['rating'])
            if 1 <= new_rating <= 5:
                review.rating = new_rating
            else:
                abort(400, "Rating must be between 1 and 5")
        if 'comment' in data:
            review.comment = data['comment']

        try:
            db.session.commit()
            return jsonify(review.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            abort(400, str(e))

    elif request.method == 'DELETE':
        try:
            db.session.delete(review)
            db.session.commit()
            return '', 204
        except Exception as e:
            db.session.rollback()
            abort(400, str(e))

if __name__ == '__main__':
    app.run(port=5555, debug=True)
