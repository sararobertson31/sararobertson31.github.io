# Sara Site Maintenance Instructions

## Interacting With Stories (Edit/Add/Delete)

1. Decide type of story you want to interact with and click the link corresponding to that story type:

   i. Poetry: https://github.com/sararobertson31/sararobertson31.github.io/blob/main/src/assets/poetry.js

   ii. Creative-nonfiction: https://github.com/sararobertson31/sararobertson31.github.io/blob/main/src/assets/creative-nonfic.js

   iii. Journalism: https://github.com/sararobertson31/sararobertson31.github.io/blob/main/src/assets/journalism.js

## Adding Stories

1. Insert a new comma in the character directly following the last curly bracket at the end of the list of entries.

Before:

```
export const stories = [{
    title: `story 1`,
    subtitle: `v1`,
    content: `the existing story`,
    imageFile: `aCoolPhoto.png`
}];

export const stories;
```

After:

```
export const stories = [{
    title: `story 1`,
    subtitle: `v1`,
    content: `the existing story`,
    imageFile: `aCoolPhoto.png`
}, ];

export const stories;
```

2. Copy and paste this block into the next character after the new comma. This creates a new story entry with empty fields

```
   {
   title: `,
    subtitle: `,
   content: `,
    imageFile: `
   }
```

Before:

```
export const stories = [{
    title: `story 1`,
    subtitle: `v1`,
    content: `the existing story`,
    imageFile: `aCoolPhoto.png`
}, ];

export const stories;
```

After:

```
export const stories = [{
    title: `story 1`,
    subtitle: `v1`,
    content: `the existing story`,
    imageFile: `aCoolPhoto.png`
}, {
    title: ``,
    subtitle: ``,
    content: ``,
    imageFile: ``
}];

export const stories;
```

3. Fill in the different categories with whatever you want. Just ensure that its within each set of backticks ``. title, content, and imageFile are required.

Before:

```
export const stories = [{
    title: `story 1`,
    subtitle: `v1`,
    content: `the existing story`,
    imageFile: `aCoolPhoto.png`
}, {
    title: ``,
    subtitle: ``,
    content: ``,
    imageFile: ``
}];

export const stories;
```

After:

```
export const stories = [{
    title: `story 1`,
    subtitle: `v1`,
    content: `the existing story`,
    imageFile: `aCoolPhoto.png`
}, {
    title: `New Story :)`,
    subtitle: `new subtitle thats totally optional`,
    content: `i put a glock in my sock and i don't give a fock`,
    imageFile: `image.webp`
}];

export const stories;
```

4. Save (see [bottom](#saving-changes))

## Editing Stories

1. Do the edits
2. ensure the structure isn't changed, only stuff WITHIN BACKTICKS
3. Save (see [bottom](#saving-changes))

## Deleting Stories

1. Delete the story categories along with the surrounding curly brackets, and the comma after the closing curly bracket if there is one. There shouldn't be 2 commas next to each other or no commas between stories.
2. Save (see [bottom](#saving-changes))

Before:

```
export const stories = [{
    title: `story 1`,
    subtitle: `v1`,
    content: `the existing story`,
    imageFile: `aCoolPhoto.png`
}, {
    title: `New Story :)`,
    subtitle: `new subtitle thats totally optional`,
    content: `i put a glock in my sock and i don't give a fock`,
    imageFile: `image.webp`
}];

export const stories;
```

After:

```
export const stories = [{
    title: `story 1`,
    subtitle: `v1`,
    content: `the existing story`,
    imageFile: `aCoolPhoto.png`
}];

export const stories;
```

## Saving Changes

1. Save the changes by pressing “commit changes” and confirming in the popup after you click it
