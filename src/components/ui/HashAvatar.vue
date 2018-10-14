<template>
  <img :src="hash | dataurl" />
</template>

<script>
import blockies from 'ethereum-blockies';

// if i dont do this the first random is black :S
blockies.create({});

export default {
  name: 'HashAvatar',
  props: {
    hash: String,
  },
  filters: {
    dataurl(h) {
      const opts = { // All options are optional
        color: '#dfe', // to manually specify the icon color, default: random
        bgcolor: '#aaa', // choose a different background color, default: random
        size: 8, // width/height of the icon in blocks, default: 8
        scale: 8, // width/height of each block in pixels, default: 4
        spotcolor: '#000', // each pixel has a 13% chance of being of a third color,
      };
      opts.seed = h;
      const icon = blockies.create(opts);
      return icon.toDataURL();
    },
  },
};
</script>
