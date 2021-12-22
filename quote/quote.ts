import axios from "axios";
import { IRespQuote, ISendQuote } from "./IQuote";

export const getQuote = async (): Promise<ISendQuote> => {
  let resp = await axios.get<IRespQuote>(
    "https://api.quotable.io/random?tags=technology"
  );
  let got: ISendQuote = {
    content: resp.data.content,
    author: resp.data.author,
  };
	return got;
};