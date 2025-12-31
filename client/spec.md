# Conversational Object Graph (COG)

## Command Language Specification — v1.1

---

## 1. Core Concepts (Recap)

- **Actors** are **stateful, addressable runtime objects/entities**
- Actors expose:

  - parameters (mutable state)
  - actions (behavior)
  - inputs / outputs (data ports)

- Actors may run synchronously or asynchronously
- Commands are:

  - explicit
  - replayable
  - inspectable

- Chat history _is the program_

---

## 2. Symbol Legend (Authoritative)

| Symbol | Meaning            | Immutable Meaning |
| ------ | ------------------ | ----------------- |
| `@`    | Actor identity     | Target            |
| `.`    | Internal structure | Parameter / port  |
| `()`   | Execution          | Action invocation |
| `=`    | Mutation           | Assignment        |
| `>`    | Flow               | Output → Input    |
| `?`    | Observation        | Inspect           |
| `+`    | Creation           | Instantiate actor |
| `-`    | Removal            | Delete actor      |
| `*`    | Enumeration        | List / wildcard   |
| `~`    | Time               | Version           |
| `$()`  | Dynamic value      | Generated / lazy  |
| `\|`   | Pipe               | Transform chain   |
| `/`    | System action      | Meta-command      |

---

## 3. Formal Grammar (EBNF-Lite)

This grammar is intentionally permissive.

```
statement        ::= create
                   | inspect
                   | assign
                   | invoke
                   | flow
                   | delete
                   | list
                   | system

create           ::= "+" actor arguments?
inspect          ::= "?" target
assign           ::= target "=" value
invoke           ::= target "(" arguments? ")"
flow             ::= target ">" target
delete           ::= "-" actor
list             ::= "*" target
system           ::= "/" identifier arguments?

target           ::= actor ( "." identifier )*
actor            ::= "@" identifier

arguments        ::= argument ( argument )*
argument         ::= identifier "=" value

value            ::= literal
                   | target
                   | dynamic
                   | piped

dynamic          ::= "$(" expression ")"
piped            ::= value ( "|" transform )+

expression       ::= prompt
                   | target
                   | expression operator expression

transform        ::= identifier arguments?

literal          ::= string | number | boolean

identifier       ::= /[a-zA-Z_][a-zA-Z0-9_-]*/
```

---

## 4. Autocomplete & Hinting Rules

Autocomplete is **structural**, not textual.

### After typing:

```
@
```

Suggest:

```
@engine
@filter
@workflow
```

---

### After:

```
@filter.
```

Suggest:

```
.cutoff
.input
.output
.type
.process()
```

---

### After:

```
@filter.
```

Autocomplete **must know** whether an entry is:

- parameter
- input port
- output port
- action

---

### After:

```
=
```

Suggest:

- literals
- compatible actor outputs
- `$()` dynamic generators

---

## 5. AI-Generated & Dynamic Data

This is where AI becomes a **first-class actor**, not a plugin.

---

## 5.1 Dynamic Value Syntax

```
$( ...)
```

Anything inside `$()` is:

- lazily evaluated
- resolved at assignment or execution time
- reproducible if logged

---

## 5.2 Prompt-Generated Values

### Basic prompt

```
@article.body = $("Write a 300 word article about rural broadband")
```

The value is:

- generated on demand
- stored unless marked ephemeral

---

### Prompt with context

```
@summary.text = $(
  "Summarize this for a newsletter:",
  @article.body
)
```

Targets inside `$()` are resolved **before generation**.

---

## 5.3 Piping AI Output

AI-generated values can be piped like any other value.

```
@post.text = $("Write a tweet about AI") | truncate length=280
```

Or:

```
@image.prompt = $("Describe a cinematic poster for this:", @movie.logline)
```

---

## 5.4 Dynamic Inputs to Actions

Actor actions can accept dynamic inputs:

```
@filter.process(
  input = $("Generate pink noise, 10 seconds")
)
```

No pre-existing actor is required.

---

## 5.5 AI as an Actor (Optional Pattern)

AI may be exposed explicitly as an actor:

```
+@ai type=llm model=gpt
```

Then:

```
@summary.text = @ai.generate(
  prompt="Summarize this",
  input=@article.body
)
```

This is **optional**—`$()` works without explicit AI actors.

---

## 5.6 Ephemeral vs Persistent Values

By default:

- `$()` results are **persisted**

Optional ephemeral marker:

```
@tmp.value = $(~ "Generate 5 ideas")
```

`~` indicates:

- do not store
- regenerate on demand

---

## 6. Pipe Operator (`|`)

Pipes apply **pure, side-effect-free transforms** to values.

```
value | transform | transform
```

Examples:

```
$("Write a poem") | sentiment
@audio.raw | normalize | compress
```

Pipes:

- never mutate actor state
- always return a value

---

## 7. Flow + AI (Combined Power)

This is the core composition model.

```
@mic.output
  > @transcript.input
  > @summary.input
```

Where:

```
@transcript.input = $("Transcribe this audio:", @mic.output)
@summary.input = $("Summarize this transcript:", @transcript.output)
```

You’ve constructed a **live actor pipeline** in chat.

---

## 8. Async & Execution Semantics

### Lazy Evaluation

- `$()` is resolved:

  - on assignment
  - or when an actor action consumes it

### Async actors expose status:

```
?@summary.status
```

Possible states:

- pending
- running
- complete
- failed

---

## 9. Failure & Recovery

Actor failures are inspectable.

```
?@summary.error
```

Retry:

```
@summary.retry()
```

Replace input:

```
@summary.input = $("Try again, shorter")
```

---

## 10. Cycles & Loops (Allowed but Explicit)

Actor feedback loops require acknowledgment:

```
@a.output > @a.input !!
```

This avoids accidental infinite execution.

---

## 11. Slash Commands (System-Level)

```
/help
/help @filter
/export
/import
/reset
/replay from=42 to=55
```

Slash commands:

- do not target actors
- operate on the environment

---

## 12. Design Invariants (Hard Rules)

1. **Every actor is inspectable**
2. **Symbols never change meaning**
3. **Chat history = executable actor graph**
4. **AI output is just data**
5. **Actors do not hide behavior**

---

## 13. Minimal AI-Driven Example

```
+@mic
+@transcript
+@summary

@mic.output > @transcript.input
@transcript.input = $("Transcribe this audio:", @mic.output)

@summary.text = $("Summarize this transcript:", @transcript.output)
```

Readable. Auditable. Extensible.

---

## Status

**CAG v1.1 — Stable**

This language is intentionally small.
Complexity belongs in **actors**, not syntax.
