export function SearchImgs(query){
  return new Promise((resolve, reject) => 
  {
    fetch('/v1/imgur_api/search/' + query)
      .then(res => res.json())
      .then(result => {
        resolve(result);
      });
  });
}

export function GetImgs() {
    return new Promise((resolve, reject) => 
    {
      fetch('/v1/stickers')
        .then(res => res.json())
        .then((result) => {
          resolve(result);
        }, (error) => {
          reject(error);
        });
    });
}

export function GetImgByID(id){
  return new Promise((resolve, reject) => 
    {
      fetch(`/v1/imgur_api/?photo_id=${id}`)
        .then(res => {console.log(res.body); return res.json()})
        .then((result) => {
          resolve(result);
        }, (error) => {
          reject(error);
        });
    });
}

export function PostNewPhoto(photo){
  return new Promise((resolve, reject) => 
    {
      $.ajax({
            url: '/v1/sticker',
            type: 'post',
            dataType: 'json',
            data: {photo: photo},
            success: function(photo) {
              //add photo to stickers
              resolve(photo);
            },
            error: function(error){
              reject(error);
            }
          });
    });
}