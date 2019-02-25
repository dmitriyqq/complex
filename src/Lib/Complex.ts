interface IPolarRepresentation {
  theta: number;
  length: number;
}

export class Complex {
  public static fromPolar(polar: IPolarRepresentation): Complex{
    return new Complex(
      polar.length * Math.cos(polar.theta),
      polar.length * Math.sin(polar.theta)
    );
  }

  constructor(public re: number = 0, public im: number = 0) {}

  public mult(other: Complex): Complex {
    const re = this.re * other.re - this.im * other.im;
    const im = this.re * other.im + this.im * other.re;
    return new Complex(re, im);
  }

  public add(other: Complex): Complex {
    return new Complex(this.re + other.re, this.im + other.im);
  }

  public sub(other: Complex): Complex {
    return new Complex(this.re - other.re, this.im - other.im);
  }

  public divide(other: Complex): Complex {
    const re = this.re * other.re - this.im * other.im;
    const im = this.im * other.re - this.re * other.im;
    const den = other.re * other.re + other.im * other.im;
    if (den === 0) {
      throw new Error("division by zero!");
    } else {
      return new Complex(re / den, im / den);
    }
  }

  public toString(): string {
    if (this.re === 0 && this.im === 0) {
      return "0";
    } else if (this.re === 0) {
      return "" + this.im + "i";
    } else if (this.im === 0) {
      return "" + this.re;
    } else {
      return "" + this.im + (this.re > 0 ? "+" : "-") + Math.abs(this.im) + "i";
    }
  }

  public length(): number {
    return Math.sqrt(this.re * this.re + this.im * this.im);
  }

  public equal(other: Complex) {
    return this.re === other.re && this.im === other.im;
  }

  public square(): Complex{
    const polar = this.polar();
    polar.length *= polar.length;
    polar.theta *= 2;
    return Complex.fromPolar(polar);
  }

  public polar(): IPolarRepresentation {
    let theta;
    if (this.re > 0) {
      theta = Math.atan(this.im / this.re);
    } else if (this.re < 0 && this.im >= 0) {
      theta = Math.atan(this.im / this.re) + Math.PI;
    } else if (this.re < 0 && this.im < 0) {
      theta = Math.atan(this.im / this.re) - Math.PI;
    } else if (this.re === 0 && this.im > 0) {
      theta = Math.PI / 2;
    } else if (this.re === 0 && this.im < 0) {
      theta = -Math.PI / 2;
    } else {
      // throw Error('polar angle indeterminate');
      theta = 0;
    }

    return { theta, length: this.length() };
  }


  public pow(k: number): Complex {
    const polar = this.polar();

    const root = Complex.fromPolar({
      length: Math.pow(polar.length, k),
      theta: polar.theta * k
    });

    return root;
  }

  public sqrt(k: number): Complex[] {
    const polar = this.polar();
    const roots = [];

    for (let i = 0; i < k; i++) {
      const root = Complex.fromPolar({
        length: Math.pow(polar.length, 1 / k),
        theta: (polar.theta + 2 * Math.PI * i) / k
      });
      roots.push(root);
    }

    return roots;
  }
}
