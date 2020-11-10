export function SearchImgur(query){
  return new Promise((resolve, reject) => 
  {
    fetch('/v1/imgur_api/search/' + query)
      .then(handleErrors)
      .then( result => resolve(result.json())
      ).catch(error => reject(error));
  });
}

export function GetStickers() {
    return new Promise((resolve, reject) => 
    {
      fetch('/v1/stickers')
      .then(handleErrors)
      .then(result => resolve(result.json()))
      .catch(error => reject(error));
    });
}

export function GetImgurImg(id){
  return new Promise((resolve, reject) => 
    {
      fetch(`/v1/imgur_api/?img_id=${id}`)
        .then(handleErrors)
        .then(result => resolve(result.json()))
        .catch(error => reject(error));
    });
}

export function PostSticker(sticker){
  return new Promise((resolve, reject) => 
    {
      $.ajax({
            url: '/v1/sticker',
            type: 'post',
            dataType: 'json',
            data: {sticker: sticker},
            success: function(sticker) {
              resolve(sticker);
            },
            error: function(error){
              reject(error);
            }
          });
    });
}

function handleErrors(response){
  if(!response.ok){
    throw Error(response.statusText);
  }
  return response;
}