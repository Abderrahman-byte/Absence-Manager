from django.utils.crypto import get_random_string
from django.forms import BaseForm

def get_errors_object (form : BaseForm) -> dict:
    data = {}

    for f in form :
        if len(f.errors) > 0 : data[f.name] = f.errors

    return data

def generate_str (len:str = 10) -> str:
    allowed_chars="abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    return get_random_string(len, allowed_chars)

def view_set_to_list_create (view_set) :
    return view_set.as_view({'get': 'list', 'post': 'create'})

def view_set_to_crud (view_set) :
    return view_set.as_view({
        'get': 'retrieve', 
        'put': 'update', 
        'patch': 'partial_update', 
        'delete': 'destroy'
    })