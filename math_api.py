from flask import Flask, request
import numpy as np
app = Flask(__name__)


@app.route('/')
def hello():
    return 'This is a service for Math API exercise'


@app.route('/min', methods=['GET'])
def find_min():
    lst = [float(i) for i in request.args.get('lst').split(",")]
    num = int(request.args.get('num'))
    sorted_lst = sorted(lst)
    return sorted_lst[:num]


@app.route('/max', methods=['GET'])
def find_max():
    lst = [float(i) for i in request.args.get('lst').split(",")]
    num = int(request.args.get('num'))
    sorted_lst = sorted(lst)
    return sorted_lst[-num:]


@app.route('/avg', methods=['GET'])
def find_avg():
    lst = [float(i) for i in request.args.get('lst').split(",")]
    return str(sum(lst) / len(lst))


@app.route('/median', methods=['GET'])
def find_median():
    lst = [float(i) for i in request.args.get('lst').split(",")]
    sorted_lst = sorted(lst)
    if len(lst) % 2 != 0:
        return str(sorted_lst[len(lst) // 2])
    else:
        return str((sorted_lst[len(lst) // 2]+sorted_lst[len(lst) // 2-1])/2)


@app.route('/percentile', methods=['GET'])
def find_percentile():
    lst = [float(i) for i in request.args.get('lst').split(",")]
    q = int(request.args.get('q'))
    new_lst = np.array(lst)
    return str(np.percentile(new_lst,q))


if __name__ == '__main__':
    app.run(threaded=True)
