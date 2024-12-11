# Testimonials

## Description

The Testimonials component displays a list of testimonials in a carousel slider. Each testimonial consists of a text and an author.

## Editing

Users can customize the Testimonials component by providing an array of testimonials. Each testimonial contains a text and an author. The component also includes navigation buttons to move between the testimonial slides.

## Properties Example:

Provide an example of the properties that can be passed to the component.

```json
{
  "title": "What our customers are saying",
  "testimonials": [
    {
      "text": "This is an amazing product!",
      "author": "John Doe"
    },
    {
      "text": "I highly recommend this service.",
      "author": "John Smith"
    }
  ]
}
```

## Component Properties

| Property     |        Property Description         | Property Type | Is Required | Default |
| :----------- | :---------------------------------: | :-----------: | :---------: | :-----: |
| title        |          The section title          |    string     |             |         |
| testimonials |   An array of testimonial objects   |     array     |      ✓      |         |
| text         | The text content of the testimonial |    string     |      ✓      |         |
| author       |    The author of the testimonial    |    string     |      ✓      |         |
