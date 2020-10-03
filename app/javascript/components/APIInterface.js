import React from 'react';

export function SearchImg(query){
  return new Promise((resolve, reject) => {fetch('/v1/pexels_api/search/' + query)
      .then(res => res.json())
      .then(result => {
        resolve(result);
      })});
}