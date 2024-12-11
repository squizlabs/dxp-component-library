export const mockDataWrapper = {
  title: 'Cards - Root Node',
  link: {
    text: 'CTA text link',
    url: 'https://squiz.net',
    target: '_blank'
  },
  cards: [
    {
      id: '12345',
      heading: 'Test Card',
      link: 'https://test.co',
      contentType: 'Content Type',
      supportingText: 'Supporting Text',
      image: {
        url: 'https://picsum.photos/700/700',
        attributes: {
          id: '44058',
          alt: 'A large estate set against a backdrop of snow-covered mountains, surrounded by a serene winter landscape.',
          width: '6000',
          height: '4000'
        }
      }
    },
    {
      id: '45000',
      heading: 'Card Two',
      link: 'https://mtx.cloud/card-two',
      contentType: 'Another type',
      supportingText: 'Here is more info',
      image: {
        url: 'https://picsum.photos/600/1000',
        attributes: {
          id: '44058',
          alt: 'A large estate set against a backdrop of snow-covered mountains, surrounded by a serene winter landscape.',
          width: '6000',
          height: '4000'
        }
      }
    },
    {
      id: '44955',
      heading: 'Card One',
      link: 'https://mtx.cloud/card-one',
      contentType: 'Content Type',
      supportingText: 'Optional supporting text'
    }
  ]
};
