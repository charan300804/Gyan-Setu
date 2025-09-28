'use server';

/**
 * @fileOverview An AI agent to summarize student performance.
 *
 * - summarizeStudentPerformance - A function that generates a summary of a student's performance.
 * - StudentPerformanceInput - The input type for the summarizeStudentPerformance function.
 * - StudentPerformanceOutput - The return type for the summarizeStudentPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudentPerformanceInputSchema = z.object({
  studentPerformanceJson: z.string().describe('A JSON string containing student performance data. This includes name, class, overall score, attendance, completed courses, and progress in each course.'),
});
export type StudentPerformanceInput = z.infer<typeof StudentPerformanceInputSchema>;

const StudentPerformanceOutputSchema = z.object({
  summary: z.string().describe("A concise summary of the student's academic performance, highlighting strengths, areas for improvement, and overall engagement."),
});
export type StudentPerformanceOutput = z.infer<typeof StudentPerformanceOutputSchema>;

export async function summarizeStudentPerformance(input: StudentPerformanceInput): Promise<StudentPerformanceOutput> {
  return studentPerformanceSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studentPerformanceSummaryPrompt',
  input: {schema: StudentPerformanceInputSchema},
  output: {schema: StudentPerformanceOutputSchema},
  prompt: `You are an expert educational analyst. Your task is to provide a clear, concise summary of a student's performance based on the provided data. The summary should be easy for a teacher to understand quickly.

  Analyze the following student data:
  {{{studentPerformanceJson}}}

  Based on this data, generate a summary that covers:
  1.  An overall assessment of the student's performance (e.g., excellent, good, needs improvement).
  2.  Specific strengths (e.g., high scores in certain subjects, high attendance).
  3.  Specific areas that need attention or improvement.
  4.  A concluding remark on their engagement or potential.
  `,
  config: {
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

const studentPerformanceSummaryFlow = ai.defineFlow(
  {
    name: 'studentPerformanceSummaryFlow',
    inputSchema: StudentPerformanceInputSchema,
    outputSchema: StudentPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
