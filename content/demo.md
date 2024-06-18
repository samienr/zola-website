+++
template = "article.html"
title = "Demo Page"
[extra]
archive = "This page is, in fact, not archived, meaning it will receive content updates."
trigger = "This page contains blackjack and hookers, and bad jokes such as this one."
disclaimer = """
- All tricks in this page are performed by the lab boys, don't try this at home
- Don't expose yourself to 4000° kelvin
- Don't take party escort submission position
- Don't interact with asbestos and moon rocks
"""
+++

Text can be **bold**, _italic_, or ~~strikethrough~~.

There should be whitespace between paragraphs.

There should be whitespace between paragraphs. We recommend including a README, or a file with information about your project.

# Heading 1

This is a normal paragraph following a header. Codeberg is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.

## Heading 2

> This is a blockquote following a header.
>
> > When something is important enough, you do it even if the odds are not in your favor.

### Heading 3

```js
// Javascript code with syntax highlighting.
var fun = function lang(l) {
  dateformat.i18n = require("./lang/" + l);
  return true;
};
```

```ruby
# Ruby code with syntax highlighting
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
```

#### Heading 4

- This is an unordered list following a header.
- This is an unordered list following a header.
- This is an unordered list following a header.

##### Heading 5

1.  This is an ordered list following a header.
2.  This is an ordered list following a header.
3.  This is an ordered list following a header.

###### Heading 6

| head1        | head two          | three |
| :----------- | :---------------- | :---- |
| ok           | good swedish fish | nice  |
| out of stock | good and plenty   | nice  |
| ok           | good `oreos`      | hmm   |
| ok           | good `zoute` drop | yumm  |

## There's a horizontal rule below this.

---

## Here is an unordered list:

- Item foo
- Item bar
- Item baz
- Item zip

## And an ordered list:

1. Item one
1. Item two
1. Item three
1. Item four

## And a nested list:

- level 1 item
  - level 2 item
  - level 2 item
    - level 3 item
    - level 3 item
- level 1 item
  - level 2 item
  - level 2 item
  - level 2 item
- level 1 item
  - level 2 item
  - level 2 item
- level 1 item

## Here are checkboxes:

- [ ] Milk
- [x] Eggs
- [x] Flour
- [ ] Coffee
- [x] Combustible lemons

### Same but interactive

<ul>
<li><input type="checkbox"> Milk</li>
<li><input checked="" type="checkbox"> Eggs</li>
<li><input checked="" type="checkbox"> Flour</li>
<li><input type="checkbox"> Coffee</li>
<li><input checked="" type="checkbox"> Combustible lemons</li>
</ul>

### With radio type

<ul>
<li><input type="radio" name="test"> Milk</li>
<li><input type="radio" name="test"> Eggs</li>
<li><input type="radio" name="test"> Flour</li>
<li><input checked="" type="radio" name="test"> Coffee</li>
<li><input type="radio" name="test" disabled=""> Combustible lemons</li>
</ul>

## Small image

{{ image(url="https://codeberg.org/Codeberg/Design/raw/branch/main/logo/icon/png/codeberg-logo_icon_blue-64x64.png", alt="Codeberg icon", transparent=true, no_hover=true) }}

## Large image

{{ image(url="https://codeberg.org/Codeberg/Design/raw/branch/main/logo/horizontal/png/codeberg-logo_horizontal_blue-850x250.png", alt="Codeberg horizontal", transparent=true, no_hover=true) }}

## Definition lists can be used with HTML syntax.

<dl>
<dt>Name</dt>
<dd>Godzilla</dd>
<dt>Born</dt>
<dd>1952</dd>
<dt>Birthplace</dt>
<dd>Japan</dd>
<dt>Color</dt>
<dd>Green</dd>
</dl>

```
Long, single-line code blocks should not wrap. They should horizontally scroll if they are too long. This line should be long enough to demonstrate this.
```

```
The final element.
```

## Extra

Alright now that the generic (slightly extended) ~~Jekyll~~ Zola demo page have ended, we can get to the custom stuff, which believe me, is neat.

😭😂🥺🤣❤️✨🙏😍🥰😊

### Shortcodes

Duckquill provides a few useful [shortcodes](https://www.getzola.org/documentation/content/shortcodes/) that simplify some tasks.

#### Image

By default images come with styling, such as rounded corners and shadow. To fine-tune these, you can use shortcodes with different variable combinations.

Available variables are:

- `url`: URL to an image.
- `url_min`: URL to compressed version of an image, original can be opened by clicking on the image.
- `alt`: Alt text, same as if the text were inside square brackets in Markdown.
- `full`: Forces image/video to be full-width.
- `pixels`: Uses nearest neighbor algorithm for scaling, useful for keeping pixel-art sharp.
- `transparent`: Removes rounded corners and shadow, useful for transparent images.
- `no_hover`: Removes zoom on hover.

Variables should be comma-separated and be inside the brackets.

```jinja2
{{/* image(url="image.png", alt="This is an image" no_hover=true) */}}
```

{{ image(url="https://i1.theportalwiki.net/img/2/23/Ashpd_blueprint.jpg", alt="Portal Gun blueprint", no_hover=true) }}
<figcaption>Image with an alt text and without zoom on hover</figcaption>

{{ image(url="https://upload.wikimedia.org/wikipedia/commons/b/b4/JPEG_example_JPG_RIP_100.jpg", url_min="https://upload.wikimedia.org/wikipedia/commons/3/38/JPEG_example_JPG_RIP_010.jpg", alt="The gravestone of J.P.G.", no_hover=true) }}
<figcaption>Image with compressed version, an alt text, and without zoom on hover</figcaption>

Alternatively, you can append the following url anchors. It can be more handy in some cases, e.g such images will render normally in any Markdown editor, opposed to the Zola shortcodes.

- `#full`: Forces image/video to be full-width.
- `#pixels`: Uses nearest neighbor algorithm for scaling, useful for keeping pixel-art sharp.
- `#transparent`: Removes rounded corners and shadow, useful for transparent images.
- `#no-hover`: Removes zoom on hover.

![Toolbx header image](https://containertoolbx.org/assets/toolbx.gif#full#pixels#transparent#no-hover)
<figcaption>Full-width image with an alt text, pixel-art rendering, no shadow and rounded corners, and no zoom on hover</figcaption>

#### Video

Same as images, but with a few differences: `no_hover` and `url_min` are not available.

```jinja2
{{/* video(url="video.webm", alt="This is a video") */}}
```

{{ video(url="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm", alt="Red flower wakes up") }}
<figcaption>WebM video example from MDN</figcaption>

#### CRT

Alright, this one doesn't simplify anything, it just adds a CRT-like effect around Markdown code blocks.

```jinja2
{%/* crt() */%}
-> Markdown code block <-
{%/* end */%}
```

{% crt() %}

```
 _____________________________________________
|.'',        Public_Library_Halls         ,''.|
|.'.'',                                 ,''.'.|
|.'.'.'',                             ,''.'.'.|
|.'.'.'.'',                         ,''.'.'.'.|
|.'.'.'.'.|                         |.'.'.'.'.|
|.'.'.'.'.|===;                 ;===|.'.'.'.'.|
|.'.'.'.'.|:::|',             ,'|:::|.'.'.'.'.|
|.'.'.'.'.|---|'.|, _______ ,|.'|---|.'.'.'.'.|
|.'.'.'.'.|:::|'.|'|???????|'|.'|:::|.'.'.'.'.|
|,',',',',|---|',|'|???????|'|,'|---|,',',',',|
|.'.'.'.'.|:::|'.|'|???????|'|.'|:::|.'.'.'.'.|
|.'.'.'.'.|---|','   /%%%\   ','|---|.'.'.'.'.|
|.'.'.'.'.|===:'    /%%%%%\    ':===|.'.'.'.'.|
|.'.'.'.'.|%%%%%%%%%%%%%%%%%%%%%%%%%|.'.'.'.'.|
|.'.'.'.','       /%%%%%%%%%\       ','.'.'.'.|
|.'.'.','        /%%%%%%%%%%%\        ','.'.'.|
|.'.','         /%%%%%%%%%%%%%\         ','.'.|
|.','          /%%%%%%%%%%%%%%%\          ','.|
|;____________/%%%%%Spicer%%%%%%\____________;|
```

{% end %}

## Captions

Media can have additional text description using the `<figcaption>` HTML tag directly under it.

```markdown
![The Office](https://i.ibb.co/MPDJRsT/ImMAXM3.png)
<figcaption>The image caption</figcaption>
```

![The Office](https://i.ibb.co/MPDJRsT/ImMAXM3.png)
<figcaption>The Office where Stanley works, it has yellow floor and beige walls</figcaption>

## Accordion

<details>
  <summary>I can be a spoiler, I can be a long text, I could be anything.</summary>

_Quack-quack!_

![Cute duck](https://i.ibb.co/x5Wd5dm/EEVSKgV.jpg)

</details>

## Small

<small>Small, cute text that doesn't catch attention.</small>

## Abbreviation

The <abbr title="American Standard Code for Information Interchange">ASCII</abbr> art are awesome!

## Aside

<aside>
Quill and a parchment
<img class="transparent no-hover" style="margin-bottom: 0; border-radius: 0;" alt="Quill and a parchment" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/%D7%A7%D7%9C%D7%A3%2C_%D7%A0%D7%95%D7%A6%D7%94_%D7%95%D7%93%D7%99%D7%95.jpg/326px-%D7%A7%D7%9C%D7%A3%2C_%D7%A0%D7%95%D7%A6%D7%94_%D7%95%D7%93%D7%99%D7%95.jpg" />
</aside>

A quill is a writing tool made from a moulted flight feather (preferably a primary wing-feather) of a large bird. Quills were used for writing with ink before the invention of the dip pen, the metal-nibbed pen, the fountain pen, and, eventually, the ballpoint pen.

As with the earlier reed pen (and later dip pen), a quill has no internal ink reservoir and therefore needs to periodically be dipped into an inkwell during writing. The hand-cut goose quill is rarely used as a calligraphy tool anymore because many papers are now derived from wood pulp and would quickly wear a quill down. However it is still the tool of choice for a few scribes who have noted that quills provide an unmatched sharp stroke as well as greater flexibility than a steel pen.

## Keyboard shortcut

```html
<kbd>⌘ Super</kbd> + <kbd>Space</kbd>
```

To switch the keyboard layout, press <kbd>⌘ Super</kbd> + <kbd>Space</kbd>.

## Highlighted

You know what? I'm gonna say some <mark>very important</mark> stuff, so <mark>important</mark> that even **bold** is not enough.

## External link

```html
<a class="external" href="https://example.org">Link to site</a>
```

<a class="external" href="https://example.org">Link to site</a>

## Buttons

```html.j2
<div class="dialog-buttons">
  <a class="inline-button" href="#top">Go to top</a>
  <a href="{{site.issuesurl}}">File an issue</a>
</div>
```

> Look at the end of this page xD
