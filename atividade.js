class Aluno {
    constructor(nome, nota, ativo = true) {
        this.nome = nome;
        this.nota = nota;
        this.ativo = ativo;
    }

    toString() {
        return `${this.nome} - Nota: ${this.nota} - Ativo: ${this.ativo}`;
    }
}

class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class ListaLigada {
    constructor() {
        this.head = null;
        this.length = 0;
        this.max = 40;
    }

    append(element) {
        if (this.length >= this.max) return false;

        const node = new Node(element);
        let current;

        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
        }

        this.length++;
        return true;
    }

    getElementAt(index) {
        if (index < 0 || index >= this.length) return null;

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    insert(element, position) {
        if (position < 0 || position > this.length || this.length >= this.max) {
            return false;
        }

        const node = new Node(element);

        if (position === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            const previous = this.getElementAt(position - 1);
            const current = previous.next;

            node.next = current;
            previous.next = node;
        }

        this.length++;
        return true;
    }

    indexOf(nome) {
        let current = this.head;
        let index = 0;

        while (current) {
            if (current.element.nome === nome) {
                return index;
            }
            index++;
            current = current.next;
        }

        return -1;
    }

    removeAt(position) {
        if (position < 0 || position >= this.length) return null;

        let removed;

        if (position === 0) {
            removed = this.head;
            this.head = removed.next;
        } else {
            const previous = this.getElementAt(position - 1);
            removed = previous.next;
            previous.next = removed.next;
        }

        this.length--;
        return removed.element;
    }

    remove(nome) {
        const index = this.indexOf(nome);
        if (index !== -1) return this.removeAt(index);
        return null;
    }

    ordenarPorNota() {
        if (this.length < 2) return;

        let swapped;

        do {
            swapped = false;
            let current = this.head;

            while (current && current.next) {
                if (current.element.nota < current.next.element.nota) {
                    const temp = current.element;
                    current.element = current.next.element;
                    current.next.element = temp;
                    swapped = true;
                }
                current = current.next;
            }
        } while (swapped);
    }

    total() {
        return this.length;
    }

    ativos() {
        let current = this.head;
        let count = 0;

        while (current) {
            if (current.element.ativo) count++;
            current = current.next;
        }

        return count;
    }

    mostrar() {
        const arr = [];
        let current = this.head;

        while (current) {
            arr.push(current.element);
            current = current.next;
        }

        return arr;
    }

    toString() {
        if (!this.head) return "";
        let current = this.head;
        let str = current.element.toString();

        while (current.next) {
            current = current.next;
            str += " | " + current.element.toString();
        }
        return str;
    }
}

const lista = new ListaLigada();

lista.append(new Aluno("Matheus", 9.2));
lista.append(new Aluno("João Vitor", 7.5));
lista.append(new Aluno("Clifton", 8.8));
lista.append(new Aluno("Pedro", 6.9, false));

console.log("Total:", lista.total());
console.log("Ativos:", lista.ativos());

lista.ordenarPorNota();
console.log("Ordenados:", lista.mostrar());

lista.remove("Bruno");
console.log("Após excluir Bruno:", lista.mostrar());

console.log("Total:", lista.total());
console.log("Ativos:", lista.ativos());
