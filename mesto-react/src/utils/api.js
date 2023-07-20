class Api{
    constructor(options){
        this._cohort = options.cohort;
        this._id = options.id;
        this._startLink = `https://mesto.nomoreparties.co/v1/${this._cohort}`;
    }

    getInitialsCard(){
        return fetch(`${this._startLink}/cards`, {
            headers: {
                authorization: this._id,
            }
        }).then(res => this._getResponseDate(res));
    }

    getUserInfo(){
        return fetch(`${this._startLink}/users/me`, {
            headers: {
                authorization: this._id,
            }
        }).then(res => this._getResponseDate(res));
    }

    editProfile({nameNew, aboutNew}){
        return fetch(`${this._startLink}/users/me`, {
            headers: {
                authorization: this._id,
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({
                name: nameNew,
                about: aboutNew
            })
            
        }).then(res => this._getResponseDate(res));
    }

    addNewCard({nameNew, linkNew}){
        return fetch(`${this._startLink}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._id,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameNew,
                link: linkNew
            })
        }).then(res => this._getResponseDate(res));
    }

    addLike(id){
        return fetch(`${this._startLink}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._id,
            }
        }).then(res => this._getResponseDate(res));
    }

    deleteLike(id){
        return fetch(`${this._startLink}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._id,
            }
        }).then(res => this._getResponseDate(res));
    }

    deleteCard(id){
        return fetch(`${this._startLink}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._id,
            }
        }).then(res => this._getResponseDate(res));
    }

    editAvatar(avatar){
        return fetch(`${this._startLink}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._id,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        }).then(res => this._getResponseDate(res));
    }

    _getResponseDate(res){
        if (!res.ok){
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
}

const api = new Api({cohort: 'cohort-70', id: '14bb670c-f56d-4056-9e87-e524535efbde'});
export default api;