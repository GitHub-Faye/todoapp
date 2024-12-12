from rest_framework import serializers
from music_controller.models import Room
from todo.models import Todo


class TodoSerializer(serializers.ModelSerializer):
    create_time = serializers.ReadOnlyField()
    update_time = serializers.ReadOnlyField()
    completed = serializers.ReadOnlyField()

    class Meta:
        model = Todo
        fields = ['id', 'title', 'detail', 'completed', 'create_time', 'update_time']


class TodoCompletedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ["id"]
        read_only_fields = ['title', 'detail', 'completed', 'create_time', 'update_time']

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause',
                  'votes_to_skip', 'created_at')



