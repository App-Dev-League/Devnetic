queue = []

# add to the queue
queue.append(1)
queue.append(2)
queue.append(3)

print(queue)  # [1, 2, 3]

# dequeue or remove from teh queue
queue.pop(0)  # 1
print(queue)  # [2, 3]
queue.pop(0)  # 2
print(queue)  # [3]
