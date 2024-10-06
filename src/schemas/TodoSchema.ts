import mongoose, { Schema } from 'mongoose';

const TodoSchema = new Schema({
  action: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

export type TodoSchemaType = {
  action: string;
};

export default TodoSchema;
