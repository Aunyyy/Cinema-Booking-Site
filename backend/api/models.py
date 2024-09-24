from django.db import models
from django.contrib.auth.models import User
import uuid
class BaseModel(models.Model):
 uid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
 created_at = models.DateField(auto_now_add=True)
 updated_at = models.DateField(auto_now_add=True)
 class Meta:
  abstract = True
 
class Movie(BaseModel):
 title = models.CharField(max_length=50)
 movie_id = models.IntegerField()
 backdrop_path = models.CharField(max_length=100)
 poster_path = models.CharField(max_length=100)
 release_date = models.CharField(max_length=11)
 overview = models.TextField()

class Seat(models.Model):
  movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="seats", null=True)
  booked_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_booking", null=True)
  seat_number = models.IntegerField()