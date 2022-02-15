import { BehaviorSubject, Subject } from 'rxjs';
import { TargetAgent } from '../interfaces/target-agent';

interface SaveRequirements {
  source: boolean,
  params: true,
  condition: boolean,
  target: boolean,
  executionInterval: boolean,
}

const saveRequirements: SaveRequirements = {
  source: false,
  params: true,
  condition: false,
  target: false,
  executionInterval: false,
};

export const store = {
  saveRequirements: new BehaviorSubject<SaveRequirements>(saveRequirements),
  sourceSet: new BehaviorSubject<boolean>(false),
  ruleAdded: new Subject<boolean>(),
  targets: new Subject<TargetAgent[]>(),
};