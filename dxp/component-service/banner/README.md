# Banner

## Description

The Banner component allows users to display a banner with optional video or image content. The component also includes play/pause functionality for the video content and color background as a fallback.

## Editing

Users can customize the Banner component by configuring its content and media. The content includes a heading, while the media can either be a video or an image. Depending on the `mediaType`, additional properties (like `videoSource` or `image`) are required.

If a video is provided, play/pause functionality is included.

## Properties Example:

```
{
  "heading": "About us",
  "mediaType": "Video",
  "videoSource": {
    "text": "Decorative video",
    "url": "https://bytes.co/wp-content/uploads/2022/03/BYTES.CO-VIDEO-CARBONATE-MEDIA-1080HD-HD-1080p.m4v"
  }
}
```

## Component Properties

| Property    |        Property Description        |                     Property Type                     | Is Required | Default |
| :---------- | :--------------------------------: | :---------------------------------------------------: | :---------: | :-----: |
| heading     |    Text for the banner heading     |                        string                         |      ✓      |         |
| mediaType   |                                    | Type of media to display: "video", "image", or "none" |      ✓      |  Image  |
| videoSource | Video source object with video URL |                       SquizLink                       |             |         |
| image       |    Image object for the banner     |                      SquizImage                       |             |         |
