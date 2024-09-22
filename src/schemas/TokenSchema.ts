import mongoose, { Schema } from 'mongoose';

const TokenSchema = new Schema({
  value: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

export type TokenSchemaType = {
  action: string;
};

export default TokenSchema;
