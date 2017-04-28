# Function Chaining

In a nutshell, Functions Chaining is ‘connecting’ a series of Functions together to do a certain task. Since you can’t easily ‘connect’ Functions today (ignore Azure Logic Apps or AWS Step Functions for a second), you need to send the output of one function to be the input of the next function, thus creating a chain. It looks something like the following illustration (thank you @cgillum for the graphics).

Simple Functions Chain: 
![alt text](../Docs/images/functionChain_1.jpg "Functions Chaining with queues")

You might notice the queues in between Functions, which are used as a “communication channel” between the different Functions. Since you can’t call one function from another, it is up to you to setup queues (or use AWS SNS) to facilitate the Function chain. 