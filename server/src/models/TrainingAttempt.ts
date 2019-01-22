import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import TrainingVersion from './TrainingVersion';
import User from './User';

export enum TrainingAttemptStatus {
  InProgress = 'in-progress',
  Complete = 'complete',
}

@Entity()
export default class TrainingAttempt {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, { nullable: false, eager: true })
  user: User;

  @CreateDateColumn()
  readonly createdOn: Date;

  @UpdateDateColumn()
  readonly updatedOn: Date;

  @Column('int', { nullable: true })
  grade: number;

  @Column('simple-json', { nullable: false })
  answer: object;

  @ManyToOne(type => TrainingVersion, { nullable: false, eager: true })
  trainingVersion: TrainingVersion;

  @Column({ type: 'enum', enum: TrainingAttemptStatus, nullable: false })
  status: string;

  @Column('text')
  traineeFeedback: string;

  get isPassing() {
    return this.grade >= this.trainingVersion.training.passPercent;
  }

  calculateGrade() {
    if (this.status != TrainingAttemptStatus.Complete) return;

    // Do the grading
    const quiz = this.trainingVersion.content;

    // Find all of the required questions in the quiz
    const gradedTypes = ['radiogroup'];
    const gradedQuestions: any[] = [];
    for (const page of quiz.pages) {
      for (const e of page.elements) {
        if (e.isRequired && gradedTypes.includes(e.type)) {
          gradedQuestions.push(e);
        }
      }
    }

    let correctCount = 0;

    for (const q of gradedQuestions) {
      const correct: string = q.correctAnswer;
      const submitted = this.answer[q.name];

      if (correct == submitted) correctCount++;
    }

    this.grade = Math.round((correctCount / gradedQuestions.length) * 100);
  }
}
