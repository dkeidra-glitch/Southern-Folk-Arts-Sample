// quiltData.js
// The pool of 20 quilt blocks students can place in their rooms.
// "traditional: true" blocks show a short info card on click.
// "traditional: false" blocks are original designs made for this game,
// inspired by patchwork tradition, with no historical claims attached.

const QUILT_BLOCKS = [
  {
    id: "log-cabin",
    name: "Log Cabin",
    traditional: true,
    origin: "Built from strips (\u201clogs\u201d) around a central square, this pattern was a favorite across the 19th-century South and beyond. The center square was often red or yellow, symbolizing a hearth fire at the heart of the home."
  },
  {
    id: "flying-geese",
    name: "Flying Geese",
    traditional: true,
    origin: "Rows of triangles suggest a flock in flight. A simple, resourceful pattern that made good use of small fabric scraps and appears in quilts across many American regions."
  },
  {
    id: "bears-paw",
    name: "Bear's Paw",
    traditional: true,
    origin: "Named for its claw-like triangle clusters, this pattern was common in rural quiltmaking and, by tradition, sometimes stitched to mark a well-traveled path or trail."
  },
  {
    id: "double-wedding-ring",
    name: "Double Wedding Ring",
    traditional: true,
    origin: "Interlocking curved rings make this one of the most labor-intensive traditional patterns. Popular from the 1920s onward, it was often made as a gift to celebrate a marriage."
  },
  {
    id: "churn-dash",
    name: "Churn Dash",
    traditional: true,
    origin: "Named for the wooden dasher used to churn butter, this everyday-object pattern reflects how quiltmakers often named blocks after tools and chores from daily rural life."
  },
  {
    id: "bow-tie",
    name: "Bow Tie",
    traditional: true,
    origin: "A simple, graphic pattern of paired triangles, popular for using up small fabric scraps and often chosen by beginning quiltmakers."
  },
  {
    id: "dresden-plate",
    name: "Dresden Plate",
    traditional: true,
    origin: "Wedge-shaped pieces fan out into a plate or sunburst shape. It became especially popular during the 1920s-30s, when colorful printed cottons were widely available."
  },
  {
    id: "nine-patch",
    name: "Nine Patch",
    traditional: true,
    origin: "One of the oldest and simplest quilt blocks, made of nine squares in a grid. Its simplicity made it a common first pattern taught to new quiltmakers."
  },
  {
    id: "shoo-fly",
    name: "Shoo Fly",
    traditional: true,
    origin: "A pieced block combining squares and triangles, related to the Nine Patch family. Its folksy name reflects the everyday, homespun language quiltmakers used for their patterns."
  },
  {
    id: "ohio-star",
    name: "Ohio Star",
    traditional: true,
    origin: "A pieced star formed from squares and triangles, one of many regional \u201cstar\u201d variations quiltmakers developed and passed down across families and communities."
  },
  {
    id: "rail-fence",
    name: "Rail Fence",
    traditional: true,
    origin: "Simple strips arranged to resemble a wooden split-rail fence, evoking the rural landscape and using fabric strips efficiently."
  },
  {
    id: "star-of-bethlehem",
    name: "Star of Bethlehem",
    traditional: true,
    origin: "An eight-pointed star built from many small diamonds, requiring precise piecing. Considered a mark of a skilled quiltmaker, often reserved for special, formal quilts."
  },
  {
    id: "basket",
    name: "Basket",
    traditional: true,
    origin: "A pieced basket shape, part of a wider family of \u201cobject\u201d quilt blocks that pictured everyday items \u2014 baskets, fans, and tools \u2014 in fabric."
  },
  {
    id: "improv-strips",
    name: "Improvisational Strips",
    traditional: true,
    origin: "Rather than following a fixed pattern, some quiltmaking traditions favor free, improvisational piecing \u2014 building compositions by eye and rhythm rather than a strict grid. This approach is especially associated with quilting communities in the rural South."
  },
  {
    id: "sunburst-sampler",
    name: "Sunburst Sampler",
    traditional: false,
    origin: null
  },
  {
    id: "porch-light-diamond",
    name: "Porch Light Diamond",
    traditional: false,
    origin: null
  },
  {
    id: "cotton-row-checks",
    name: "Cotton Row Checks",
    traditional: false,
    origin: null
  },
  {
    id: "indigo-ripple",
    name: "Indigo Ripple",
    traditional: false,
    origin: null
  },
  {
    id: "mustard-meadow",
    name: "Mustard Meadow",
    traditional: false,
    origin: null
  },
  {
    id: "attic-windowpane",
    name: "Attic Windowpane",
    traditional: false,
    origin: null
  }
];

// Path convention: assets/quilts/<id>.svg
function quiltSvgPath(id) {
  return `assets/quilts/${id}.svg`;
}
