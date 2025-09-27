'use server';

/**
 * @fileOverview A personalized learning path suggestion AI agent.
 *
 * - personalizedLearningPaths - A function that suggests personalized learning paths based on student performance.
 * - PersonalizedLearningPathsInput - The input type for the personalizedLearningPaths function.
 * - PersonalizedLearningPathsOutput - The return type for the personalizedLearningPaths function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLearningPathsInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  performanceData: z.string().describe('Student performance data in JSON format. Should contain topics, scores, and time spent on each topic.'),
  currentTopic: z.string().describe('The topic the student is currently studying.'),
  availableTopics: z.array(z.string()).describe('The list of available learning topics.'),
});
export type PersonalizedLearningPathsInput = z.infer<typeof PersonalizedLearningPathsInputSchema>;

const PersonalizedLearningPathsOutputSchema = z.object({
  suggestedPaths: z.array(z.string()).describe('Suggested learning paths based on performance data.'),
  reasoning: z.string().describe('Explanation of why the paths were suggested.'),
});
export type PersonalizedLearningPathsOutput = z.infer<typeof PersonalizedLearningPathsOutputSchema>;

export async function personalizedLearningPaths(input: PersonalizedLearningPathsInput): Promise<PersonalizedLearningPathsOutput> {
  return personalizedLearningPathsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedLearningPathsPrompt',
  input: {schema: PersonalizedLearningPathsInputSchema},
  output: {schema: PersonalizedLearningPathsOutputSchema},
  prompt: `You are an AI learning assistant that analyzes student performance data and suggests personalized learning paths.

  Student ID: {{{studentId}}}
  Current Topic: {{{currentTopic}}}
  Available Topics: {{#each availableTopics}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Performance Data: {{{performanceData}}}

  Based on the student's performance data and the available topics, suggest personalized learning paths. Explain your reasoning for suggesting these paths, focusing on areas where the student needs the most improvement. Only suggest learning paths that are in the list of available topics.
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const personalizedLearningPathsFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathsFlow',
    inputSchema: PersonalizedLearningPathsInputSchema,
    outputSchema: PersonalizedLearningPathsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
