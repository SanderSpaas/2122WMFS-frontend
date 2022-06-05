<style scoped>
input {
  border-radius: 5px;
  padding: 5px;
  width: 50vw;
}
@media only screen and (min-width: 768px) {
  input {
    width: 30vw;
  }
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
