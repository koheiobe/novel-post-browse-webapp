<template>
  <div>
    <BIconChevronRight v-show="!isOpen" @click="toggleForm" />
    <BIconChevronDown v-show="isOpen" @click="toggleForm" />
    <div v-if="isOpen">
      <div class="form">
        <div>
          index:
          <input
            :value="index"
            @change="onChangeForm('index', $event.target.value, chapterIdx)"
            :max="chaptersCount"
            type="number"
            name="index"
            min="1"
          />
        </div>
        <div>
          title:
          <input
            :value="title"
            @change="onChangeForm('title', $event.target.value, chapterIdx)"
            type="text"
            name="title"
          />
        </div>
        <div>
          content:
          <textarea
            :value="content"
            @change="onChangeForm('content', $event.target.value, chapterIdx)"
            name="content"
            rows="3"
            cols="30"
          />
        </div>
      </div>
      <div>
        <b-button @click="onDelete(index)" variant="danger">削除</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconChevronDown, BIconChevronRight } from 'bootstrap-vue'

export default {
  components: {
    BIconChevronDown,
    BIconChevronRight
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    index: {
      type: String,
      default: null
    },
    chapterIdx: {
      type: Number,
      default: null
    },
    chaptersCount: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleForm: function() {
      this.isOpen = !this.isOpen
    },
    onChangeForm: function(name, value, chapterIdx) {
      this.$emit('onChangeForm', name, value, chapterIdx)
    },
    onDelete: function(index) {
      this.$emit('onDelete', index)
    }
  }
}
</script>

<style module></style>
