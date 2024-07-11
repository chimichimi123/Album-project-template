#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Album, Member, Review

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/albums', methods=['GET', 'POST'])
def handle_albums():
    if request.method == 'POST':
        data = request.json
        new_album = Album(**data)
        db.session.add(new_album)
        db.session.commit()
        return jsonify(new_album), 201

    albums = Album.query.all()
    return jsonify([album.to_dict() for album in albums]), 200

@app.route('/albums/<int:album_id>', methods=['GET'])
def get_album(album_id):
    album = Album.query.get(album_id)
    if not album:
        return jsonify({'error': 'Album not found'}), 404

    reviews = Review.query.filter_by(album_id=album_id).all()

    album_data = {
        'id': album.id,
        'title': album.title,
        'artist': album.artist,
        'release_date': album.release_date.strftime('%Y-%m-%d'),
        'cover_image': album.cover_image,
        'genre': album.genre,
        'popularity': album.popularity,
        'label': album.label,
        'tracks': album.tracks,
        'embed_link': album.embed_link,
        'reviews': [{'id': review.id,
                     'member_name': review.member.name,
                     'review_date': review.review_date.strftime('%Y-%m-%d'),
                     'rating': review.rating,
                     'comment': review.comment} for review in reviews]
    }

    return jsonify(album_data)

@app.route('/members', methods=['GET', 'POST'])
def handle_members():
    if request.method == 'POST':
        data = request.json
        new_member = Member(**data)
        db.session.add(new_member)
        db.session.commit()
        return jsonify(new_member), 201

    members = Member.query.all()
    return jsonify([member.to_dict() for member in members]), 200

@app.route('/reviews', methods=['GET', 'POST'])
def handle_reviews():
    if request.method == 'POST':
        data = request.json
        new_review = Review(**data)
        db.session.add(new_review)
        db.session.commit()
        return jsonify(new_review.to_dict()), 201

    reviews = Review.query.all()
    return jsonify([review.to_dict() for review in reviews]), 200



if __name__ == '__main__':
    app.run(port=5555, debug=True)

