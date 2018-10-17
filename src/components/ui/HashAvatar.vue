<template>
  <img :src="hash | dataurl" />
</template>

<script>
import Identicon from 'identicon.js';


export default {
  name: 'HashAvatar',
  props: {
    hash: String,
  },
  filters: {
    dataurl(h) {
      const opts = {
        foreground: [53, 124, 255, 255],               // rgba black
        background: [255, 255, 255, 255],         // rgba white
        margin: 0.1,                              // 20% margin
        size: 72,                                // 420px square
        format: 'svg'                             // use SVG instead of PNG
      };
      const icon = new Identicon(h.replace('0x', ''), opts).toString();
      return ('data:image/svg+xml;base64,' + icon);
    },
  },
};
</script>
