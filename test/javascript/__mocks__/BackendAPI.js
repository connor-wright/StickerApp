const photos = [
  {id: 'Taco', src: {small: 'https://imgur.com/gallery/3nSMulw'}}
];


export const SearchImgs = jest.fn((query) => {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      resolve(photos);
    });
  });
})