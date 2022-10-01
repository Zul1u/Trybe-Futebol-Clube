import { Request } from 'express';
import { TokenInfos } from './Token.types';

interface ModifiedRequest extends Request {
  tokenInfos?: TokenInfos
}

export default ModifiedRequest;
