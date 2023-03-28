from pulp import *

q = [0.1479, 0.02, 0.005, 0.0001, 0.01, 0.0003, 0.0002, 0.006, 0.0005, 0.81]
p = [0.17, 0.12, 0.025, 0.0008, 0.02, 0.0005, 0.0003, 0.0075, 0.001, 0.6549]
w = 100

# Create the optimization problem
prob = LpProblem("Minimize_Y", LpMinimize)

# Define the decision variables and their lower bounds
x = [pulp.LpVariable(f"x{i}", lowBound=0) for i in range(1, 11)]
y = pulp.LpVariable("y", lowBound=100)

# Add the objective function
prob += y, "Objective Function"

# Add the constraints
# Define the constraints and add them to the problem
for i in range(10):
    prob += (q[i]*w + x[i]) == y*p[i], f"Constraint {i+1}"

# Solve the problem
prob.solve()

# Print the results
print("Status:", LpStatus[prob.status])
print("Optimal value of y:", value(prob.objective))
print("Optimal values of x:", [value(x[i]) for i in range(0, 10)])