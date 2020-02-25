<template>
  <div>
    <BIconChevronRight
      v-show="!isOpen"
      @click="toggleForm"
      :class="$style.clickable"
    />
    <BIconChevronDown
      v-show="isOpen"
      @click="toggleForm"
      :class="$style.clickable"
    />
    <div v-if="isOpen">
      <div :class="['form-group', $style.formContainer]">
        <div :class="$style.inputContainer">
          <label for="index">章番号</label>
          <input
            :value="index"
            :max="chaptersCount"
            :class="$style.chapterIndexInput"
            @change="onChangeForm('index', $event.target.value, chapterIdx)"
            type="number"
            name="index"
            min="1"
            class="form-control"
            placeholder="他の章と違う番号を割り当ててください。"
          />
        </div>
        <div :class="$style.inputContainer">
          <label for="title">タイトル</label>
          <input
            :value="title"
            @change="onChangeForm('title', $event.target.value, chapterIdx)"
            class="form-control"
            type="text"
            name="title"
            placeholder="タイトルを入力"
          />
        </div>
        <div :class="$style.inputContainer">
          <label for="content">本文</label>
          <textarea
            :value="content"
            @change="onChangeForm('content', $event.target.value, chapterIdx)"
            class="form-control"
            name="content"
            rows="10"
            cols="50"
          />
        </div>
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
    },
    defaultIsOpen: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      isOpen: false
    }
  },
  created: function() {
    this.isOpen = this.defaultIsOpen
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

<style module lang="scss">
.clickable {
  cursor: pointer;
}
.formContainer {
  background-color: #f9f9f9;
  padding: 16px;
}
.inputContainer {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  input,
  textarea {
    max-width: 850px;
  }
}

.chapterIndexInput {
  width: 200px;
}

.inputContainer label:first-child {
  margin-right: 16px;
  min-width: 100px;
}
</style>
