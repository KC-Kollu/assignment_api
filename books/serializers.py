from rest_framework import serializers
from .models import Book, Review

class ReviewSerializer(serializers.ModelSerializer):
    reviewer_username = serializers.ReadOnlyField(source='reviewer.username')

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['book', 'reviewer', 'reviewer_username']

class BookSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = '__all__'
