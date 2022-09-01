/**
    Copyright 2022 Google LLC
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
        https://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
 */

import { isDeepStrictEqual } from 'util';
import { Job, ModelSpec } from '../common/common';
import { Rule } from '../common/rule';
import { FirebaseCollection } from './firebase-collection';

/**
 * A firebase collection implementation with additional functionality for jobs.
 */
export class JobsCollection extends FirebaseCollection<Job> {
  /**
   * Determines whether a rule is similar enough to a job to be executed in
   * that job.
   *
   * @param {Job} job the job to check
   * @param  {Rule} rule the rule against which to check
   * @returns {boolean} whether job and rule are similar.
   */
  private isJobSimilarToRule(job: Job, rule: Rule) {
    if (job.ownerId === rule.ownerId) {
      return false;
    }
    if (job.executionInterval !== rule.executionInterval) {
      return false;
    }

    const parameterNames = new Set(
      ...Object.keys(job.sourceParameters),
      ...Object.keys(rule.source.parameters)
    );
    for (const parameterName of parameterNames) {
      if (
        !isDeepStrictEqual(
          rule.source.parameters[parameterName],
          job.sourceParameters[parameterName]
        )
      ) {
        return false;
      }
    }
    return true;
  }

  /**
   * Finds a matching existing job for the rule or creates a new one.
   * @param {Rule} rule the rule for which to produce a job
   * @returns {Promise<Job>} the existing or newly created job
   */
  async findOrCreateJobForRule(rule: Rule): Promise<Job> {
    const sourceAgentJobs = await this.findWhere(
      'sourceAgentId',
      rule.source.agentId
    );
    const existingJob = sourceAgentJobs.find((job) =>
      this.isJobSimilarToRule(job, rule)
    );
    if (existingJob) {
      return existingJob;
    } else {
      const newJob: ModelSpec<Job> = {
        ownerId: rule.ownerId,
        sourceAgentId: rule.source.agentId,
        sourceParameters: rule.source.parameters,
        executionInterval: rule.executionInterval,
        ruleIds: [],
      };
      return this.insert(newJob);
    }
  }
}