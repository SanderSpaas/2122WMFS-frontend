<style scoped>
input {
  border-radius: 15px;
  padding: 5px;
}
.form-field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
<script>
export default {
  emits: ["update:modelValue"],
  props: [
    "modelValue",
    "error",
    "label",
    "type",
    "id",
    "required",
    "placeholder",
  ],
};
</script>
<template>
  <div class="form-field">
    <label :for="id">{{ label }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :id="id"
      :required="required"
      :placeholder="placeholder"
    />
    <span role="”alert”">{{ error }}</span>
  </div>
</template>
