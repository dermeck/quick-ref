# CSS Flexbox Quick Reference
A compact overview of Flexbox.

## What is Flexbox?

Flexbox is a CSS layout mode which allows a flexible layout, distribution and alignment of children within a container.

Items are layed out along two axis based on the defined `flex-flow` and the [writing mode](https://www.w3.org/TR/css-writing-modes-4/#writing-mode) and can be configured to fill the space inside the container flexibly.

![flex-direction-terms](https://www.w3.org/TR/css-flexbox-1/images/flex-direction-terms.svg)*directions and sizing terms as applied to a row flex container 
(source: [w3c](https://www.w3.org/TR/css-flexbox-1/#box-model))*

---

## Container properties

| property        | value (default value is bold)                                          | effect                                                                                          |
| --------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| display         | flex, inline-flex                                                      | activates flex layout mode                                                                      |
| flex-direction  | **row**, row-reverse, column, column-reverse                           | direction of the main-axis                                                                      |
| justify-content | **flex-start**, flex-end, center, space-between, space-around          | alignment of items along the main axis                                                          |
| align-items     | **stretch**, flex-start, flex-end, center, baseline                    | default alignment for all items long the cross axis                                             |
| flex-wrap       | **no-wrap**, wrap, wrap-reverse                                        | wrapping behavior                                                                               |
| align-content   | **flex-start**, flex-end, center, space-between, space-around, stretch | align flex container lines when there is extra space in the cross-axis (how content is wrapped) |
| flex flow       | [flex-direction] [fex-wrap]                                            | shorthand for `flex-direction` and `flex-wrap` to define the main and cross axis                |

### justify-content

| value         | effect on items                                                           |
| ------------- | ------------------------------------------------------------------------- |
| flex-start    | packed toward the start of the line                                       |
| flex-end      | packed toward the end of the line                                         |
| center        | packed toward the center of the line.                                     |
| space-between | even space between items, no space between outer items and container edge |
| space-around  | evenly distributed in the line, with half-size spaces on either end       |

### align-items

| value      | effect on items               |
| ---------- | ----------------------------- |
| stretch    | stretch to fill the container |
| flex-start | at start of the cross-axis    |
| flex-end   | at end of the cross-axis      |
| center     | centered in the cross-axis    |
| baseline   | as baseline align             |

## Flex Items Properties

tbd

---

## Ressources and further Reading

- [CSS Flexible Box Layout Module Level 1 (w3c)](https://www.w3.org/TR/css-flexbox-1)
- [ A Complete Guide to Flexbox (CSS-TRICKS)](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)