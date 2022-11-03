from django.utils.crypto import get_random_string

def get_errors_object (form) :
    data = {}

    for f in form :
        if len(f.errors) > 0 : data[f.name] = f.errors

    return data

def generate_str (len = 10) :
    allowed_chars="abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    return get_random_string(len, allowed_chars)