<style scoped></style>
<script>
export default {
  emits: ["modelValue"],
  props: ["modelValue", "error", "label", "type", "id", "required"],
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
    />
    <span role="”alert”">{{ error }}</span>
  </div>
</template>
