N_B = input().split()
N = int(N_B[0])
B = int(N_B[1])

price = []
total = []
maxgifts = -1

for i in range(N):
    z = input().split()
    z[0] = int(z[0])
    z[1] = int(z[1])
    price.append(z)
for i in range(N):
    total.clear()
    total.append(price[i][0] // 2 + price[i][1])
    for j in range(N):
        if i != j:
            total.append(price[j][0] + price[j][1])
    total.sort()
    c = 0
    counter = 0
    for k in range(len(total) - 1):
        if c + total[k] > B:
            break
        c += total[k]
        counter += 1
    maxgifts = max(maxgifts, counter)
print(maxgifts)
