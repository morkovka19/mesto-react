class Api{
    constructor(options){
        this._cahort = options.cahort;
        this._id = options.id;
    }

    getInitialsCard(){
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cahort}/cards`, {
            headers: {
                authorization: this._id,
            }
        }).then(res => this._getResponseDate(res));
    }

    getUserInfo(){
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cahort}/users/me`, {
            headers: {
                authorization: this._id,
            }
        }).then(res => this._getResponseDate(res));
    }

    editProfile({nameNew, aboutNew}){
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cahort}/users/me`, {
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
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cahort}/cards`, {
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
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cahort}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._id,
            }
        }).then(res => this._getResponseDate(res));
    }

    deleteLike(id){
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cahort}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._id,
            }
        }).then(res => this._getResponseDate(res));
    }

    deleteCard(id){
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cahort}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._id,
            }
        }).then(res => this._getResponseDate(res));
    }

    editAvatar(avatar){
        return fetch(`https://mesto.nomoreparties.co/v1/${this._cahort}/users/me/avatar`, {
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

const api = new Api({cahort: 'cohort-70', id: '14bb670c-f56d-4056-9e87-e524535efbde'});
export default api;