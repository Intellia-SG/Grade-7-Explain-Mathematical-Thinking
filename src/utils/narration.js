// src/utils/narration.js
import { say, ask, cheer, emphasize, think, instruct } from './audio';

export function wonderNarration() {
  return [
    think("Sofia says, when you multiply two numbers, the answer is always bigger."),
    ask("Carlos says, not always! Who is right, and how can we prove it?"),
    cheer("Let's discover how to explain our mathematical thinking!"),
  ];
}

export const STORY_NARRATIONS = [
  // Panel 1
  say("John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and Yuki are the Global Think-Aloud Club. They meet online from ten countries to enter the World Math Fair."),
  // Panel 2
  emphasize("The judge, Whyzo the owl, has one rule. A right answer is not enough. You must explain why it is right!"),
  // Panel 3
  ask("Mike in New York says, seven plus nine is sixteen, so two odd numbers always add to an even number. Whyzo asks, does one example prove it?"),
  // Panel 4
  say("Yuki in Tokyo shows a picture. Each odd number is a pair of dots with one dot left over. Two leftover dots make a new pair, so the total is even!"),
  // Panel 5
  say("Aisha in Mumbai checks her friend's work. Negative three minus negative five equals two, not negative eight. She points to the exact step where the mistake happened."),
  // Panel 6
  emphasize("Claim, evidence, reason! With these three tools, every explorer can explain their thinking and earn the Golden Logic Trophy!"),
];

export const STATION_NARRATIONS = [
  instruct("Drag the counters into pairs. Then build your argument with a claim, evidence, and a reason!"),
  ask("Test some numbers. Is this claim always, sometimes, or never true?"),
  ask("Read each step carefully. Can you find the first step where the mistake happens?"),
];

export function reflectNarration() {
  return [
    think("What an adventure! Can you explain one claim using evidence and a reason?"),
    cheer("Lesson complete! You are a Global Think-Aloud Champion!"),
  ];
}
